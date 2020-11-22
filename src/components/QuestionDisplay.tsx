import React from 'react'

import './QuestionDisplay.scss'

interface Props {}

export const QuestionDisplay: React.FC<Props> = () => {

  return (
    <div className='questions-display-container'>

      <h3>Instant GIF Converter</h3>
        This application uses TypeScript React and Redux to manage the state of the notes you add.
        <br /><br />
        It's been my first time creating a React application from scratch.
        <br /><br />
        Besides learning Redux, state-management and the React-types I've been getting a bit side-tracked:

      <ul>
        <li>
          I've added local-storage for the notes, which allows for notes to be stored for ever.
        </li>

        <li>
          I've added a video-to-gif-converter using ffmpeg, a library written in C, which compliles to Web Assembly. Web Assembly is a very new technology, which, instead of compiling everything to Javascript in webbrowsers, compiles to machine code. Where compilers can be build for basically any language, with near native performance. For this reason, and the library being in C, the conversion of video, which is normally done on the cloud as Javascript in the browser simply isn't powerfull enough, allows for this performance-heavy-task to be performed directly in the webbrowser, using the users hardware.
        </li>

        <li>
          You can add any video file, select where you want the gif to start, and how long you want the gif to be. Then simply select the convert button, and the gif will display below the video preview.
        </li>
      </ul>
    </div>
  )
}
