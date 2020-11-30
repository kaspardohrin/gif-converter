import React, { useEffect, ChangeEvent } from 'react'
import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg'

import './Converter.scss'

interface Props { }

const ffmpeg: FFmpeg = createFFmpeg(/*{log: true}*/)

export const Converter: React.FC<Props> = () => {
  const [ready, ready_set] = React.useState<boolean>(false)

  const [start, start_set] = React.useState<string>('0')
  const [length, length_set] = React.useState<string>('5')
  const [video_length, video_length_set] = React.useState<number>(0)

  const [video, video_set] = React.useState<any>()
  const [gif, gif_set] = React.useState<string>('')

  const [converting, converting_set] = React.useState<boolean>(false)

  useEffect(() => {load()}, [/*empty array prevents it from running again*/])

  const load = async (): Promise<void> => {
    if (ffmpeg.isLoaded()) return ready_set(true)

    await ffmpeg.load(); ready_set(true)
  }

  const video_length_get = (event: React.SyntheticEvent<HTMLVideoElement, Event>): any => {
    // @ts-ignore
    const input: number = event.target.duration

    const value: number = Number(String(input).split(/\./g)[0])

    video_length_set(value)
  }

  const begin_update = (event: ChangeEvent<HTMLInputElement>) => {
    let input: number = Number(event.target.value)
    let n_length: number = Number(length)

    if (!video) return

    if (input < 0) return start_set('0')

    if (input > video_length) input = video_length - 1; start_set(`${video_length - 1}`)

    if ((n_length + input - 1) > video_length) length_set(`${video_length - input}`)

    if (input >= video_length) return

    start_set(`${input}`)
  }

  const length_update = (event: ChangeEvent<HTMLInputElement>) => {
    let input: number = Number(event.target.value)
    let n_begin: number = Number(start)

    if (!video) return

    if (input < 1) return length_set('1')

    if (input > video_length) input = video_length; length_set(`${video_length}`)

    if ((n_begin + input) > video_length) start_set(`${video_length - input}`)

    if (input >= video_length) return

    length_set(`${input}`)
  }

  const video_update = (event: ChangeEvent<HTMLInputElement>) => {
    const video: any = event.target.files?.item(0)!

    if (
      video.name.split(/\./g).pop() !== 'mp4'
      && video.type !== 'video/mp4'
    ) return

    video_set(video)
  }

  const convert = async (): Promise<void> => {
    if (!video) return

    if (converting) return

    converting_set(true)

    await ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video))
    await ffmpeg.run('-i', 'test.mp4', '-t', `${length}`, '-ss', `${start}`, '-f', 'gif', 'out.gif')

    converting_set(false)

    const data: Buffer = ffmpeg.FS('readFile', 'out.gif')
    const url: string = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }))

    gif_set(url)
  }

    return ready
    ? (
      <div className='media-container'>
        {
          (video)
              ? <video controls src={URL.createObjectURL(video)} onLoadedMetadata={(e) => video_length_get(e)}></video>
            : <div className='placeholder-video'></div>
          }

        <div className='control-panel'>
          <input onChange={video_update} type='file' />
          <span>Start:</span>
          <input onChange={begin_update} type='number' placeholder={start} value={start} />
          <span>Duration:</span>
          <input onChange={length_update} type='number' placeholder={length} value={length} />
          <button onClick={convert}>Convert</button>
        </div>
        {
          (gif)
              ? <img src={gif} width='250' alt={`gif of the video you've uploaded`} />
              : <div className={`placeholder-gif`}>
                  <div className={`${(converting) ? 'loading' : ''}`}></div>
                </div>
        }
      </div>
      ) : (
      <div className='loading-screen'>
        <div id="spinner" />
      </div>
    )
}
