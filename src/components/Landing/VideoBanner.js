import React, { Component } from 'react'
import { observer } from 'mobx-react'

import {
  container,
  videoLayover,
  videoActive,
  videoClose,
} from '../../styles/VideoBanner.module.scss'

/**
 * This is the Landing video banner. TODO: refactor into functional style.
 *
 */
export class VideoBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoActive: false,
    }
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.openVideo = this.openVideo.bind(this)
    this.closeVideo = this.closeVideo.bind(this)
  }

  handleKeyDown = event => {
    if (this.state.videoActive && event.key === 'Escape') {
      this.closeVideo()
    }
  }

  openVideo = () => {
    // Show Video
    this.setState({ videoActive: true })
    // Disable scroll
    document.body.scrollTop = document.documentElement.scrollTop = 0
    let x = window.scrollX
    let y = window.scrollY
    window.onscroll = function() {
      window.scrollTo(x, y)
    }
    // Activate Escape listener
    document.addEventListener('keydown', this.handleKeyDown, false)

    // Play Video and Wait for transitions // why bind(this) in arrow?
    this.playVideo()
  }
  playVideo = () => {
    setTimeout(
      () => {
        this.refs.video.play()
      },
      window.innerWidth > 768 ? 1500 : 400
    )
  }

  closeVideo = () => {
    // Hide Video
    this.setState({ videoActive: false })
    // Stop/Reset Video
    this.refs.video.load()
    // Enable Scroll
    window.onscroll = function() {}
    // Remove Escape listener
    document.removeEventListener('keydown', this.handleKeyDown, false)
  }

  render() {
    return (
      <div>
        <section style={{ position: 'relative', top: '0', opacity: '.7' }}>
          <div className={container}>
            <video loop autoPlay={true}>
              <source
                src="https://s3.amazonaws.com/videos.bulubox.com/Packing+190211-t1t0ov7-hiA.mp4"
                type="video/mp4"
              />
              <source
                src="https://s3.amazonaws.com/videos.bulubox.com/Packing+190211-t1t0ov7-hiA.mp4"
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
        <section
          className={
            videoLayover + ' ' + (this.state.videoActive ? videoActive : '')
          }
        >
          <video
            controls
            crossOrigin="anonymous"
            controlsList="nodownload"
            disablepictureinpicture="true"
            id="bedtimeVideo"
            ref="video"
          >
            <source
              src="https://assets.disneysubscription.com/Bedtime/video/homepage-long-1920x1080.mp4"
              type="video/mp4"
            />
            <source
              src="https://assets.disneysubscription.com/Bedtime/video/homepage-long-1280x720.webm"
              type="video/webm"
            />
            <track
              kind="captions"
              src="https://assets.disneysubscription.com/Bedtime/video/bedtime-captions.vtt"
              srcLang="en"
            ></track>
            Video Description: The video opens to a front door at nighttime,
            where a Disney themed box is lying in wait. As the door opens, a boy
            and his mother appear. The boy enthusiastically reacts as he sees
            the box, which is surrounded by animated sparkles. The boy runs out
            and picks up the box, which features the Disney Bedtime Adventure
            Box logo. A female narrator says, Every night an adventure awaits.
            The boy picks up the box and runs inside with it as the mom closes
            the door. The video transitions to show the boy opening the box in
            his living room alongside his mom, dad and sister. The boy picks out
            a Mickey Mouse plush doll and hugs it. A female narrator says, As
            bedtime becomes a magical journey. Animated stars and an animated
            planet begin sparkling around the box before an animated rocket ship
            takes off from inside the box. The boy’s mouth opens as he points up
            at the rocket and watches in wonder. The boy then holds up a
            children’s book with the title Walt Disney’s Mickey Mouse and His
            Spaceship, which he hands to his sister as their parents look on and
            smile. The boy then happily pulls out a series of fun games and
            activities from the box. The video transitions to show the boy in a
            bathtub where his mom is giving him a bubble bath. Animated bubbles
            fill the air as his mom creates a set of bubble Mickey Mouse ears on
            his head. A female narrator says, Where little ones can blast off.
            The boy places Mickey Mouse bath stickers on the tile walls of the
            bath tub. The video transitions to show the boy in the bathroom
            where his mom is using a Mickey Mouse towel to dry him off. The
            video transitions to show the boy and his family in his bedroom with
            the box. They are all playing a game together. The boy and his
            sister are wearing pajamas, and she is holding with a Minnie Mouse
            plush doll. A female narrator says, To a place filled with fun and
            friends. The video transitions to show the boy standing on his bed
            with his Mickey Mouse plush doll under his arm. Animated stars and
            an animated planet sparkle around him as an animated astronaut
            helmet appears on his head. A female narrator says, And enter a
            story all their own. The boy holds his arm up in the air
            triumphantly. The video transitions to show the boy and his sister
            in bed as their dad reads them the children’s book with the title
            Walt Disney’s Mickey Mouse and His Spaceship. Animated stars and an
            animated planet sparkle around them. A female narrator says, Magic
            delivered monthly. The mom brings the daughter her Minnie Mouse
            plush doll and kisses her kids on their foreheads. The boy lays his
            head down and falls asleep as an animated rocket flies by him. The
            video transitions to show the mom and dad looking in at the boy from
            his doorframe. The boy has fallen asleep in bed. Animated stars
            sparkle around him as an animated rocket flies by him. A female
            narrator says, A gift that keeps on giving. The parents smile at one
            another and close the door. A female narrator says, Inspired by
            Disney. Onscreen text says, Disney Bedtime Adventure Box. The end.
          </video>
          {/*eslint-disable-next-line*/}
          <a className={videoClose} onClick={this.closeVideo}>
            <img
              src="https://assets.disneysubscription.com/x-close.png"
              alt="close"
            />
          </a>
        </section>
      </div>
    )
  }
}

export default observer(VideoBanner)
