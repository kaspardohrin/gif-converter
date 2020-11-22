import React, { useEffect, ChangeEvent } from 'react'
import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg'

import './Converter.scss'

interface Props { }

const ffmpeg: FFmpeg = createFFmpeg(/*{log: true}*/)

export const Converter: React.FC<Props> = () => {
  const [ready, ready_set] = React.useState<boolean>(false)
  const [video, video_set] = React.useState<any>()
  const [gif, gif_set] = React.useState<string>('')
  const [length, length_set] = React.useState<string>('5')
  const [begin, begin_set] = React.useState<string>('0')

  useEffect(() => {load()}, [/*empty array prevents it from running again*/])

  const load = async (): Promise<void> => {
    if (ffmpeg.isLoaded()) return ready_set(true)

    await ffmpeg.load(); ready_set(true)
  }

  const video_update = (event: ChangeEvent<HTMLInputElement>) => {
    const video: File = event.target.files?.item(0)!

    if (
      video.name.split(/\./g).pop() !== 'mp4'
      && video.type !== 'video/mp4'
    ) return

    video_set(video)
  }

  const begin_update = (event: ChangeEvent<HTMLInputElement>) => {
    const input: string = event.target.value

    begin_set(input)
  }

  const length_update = (event: ChangeEvent<HTMLInputElement>) => {
    const input: string = event.target.value

    length_set(input)
  }

  const convert = async (): Promise<void> => {
    if (!video) return

    await ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video))
    await ffmpeg.run('-i', 'test.mp4', '-t', `${length}`, '-ss', `${begin}`, '-f', 'gif', 'out.gif')

    const data: Buffer = ffmpeg.FS('readFile', 'out.gif')
    const url: string = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }))

    gif_set(url)
  }

  return ready
  ? (
    <div className='media-container'>
      {
        (video)
          ? <video controls src={URL.createObjectURL(video)}></video>
          : <div className='placeholder-video'></div>
        }

      <div className='control-panel'>
        <input onChange={video_update} type='file' />
        <span>Start:</span>
        <input onChange={begin_update} type='number' placeholder={begin} value={begin} />
        <span>Duration:</span>
        <input onChange={length_update} type='number' placeholder={length} value={length} />
        <button onClick={convert}>Convert</button>
      </div>
      {
        (gif)
            ? <img src={gif} width='250' alt={`gif of the video you've uploaded`} />
            : <div className='placeholder-gif'></div>
      }
    </div>
    ) : (
    <div className='loading-screen'>
      <div id="spinner" />
    </div>
  )
}
