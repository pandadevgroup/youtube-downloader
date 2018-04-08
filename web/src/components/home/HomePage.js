import React from "react";
import injectSheet from 'react-jss'
import * as YoutubeService from "../../services/youtube.service";
import Search from "../search/Search";
import VideoInfo from "../video-info/VideoInfo";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
    paddingBottom: "64px"
  },
  title: {
    fontSize: "2rem",
    marginTop: "4rem",
    marginBottom: "1rem"
  }
};

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      videoInfo: {"thumbnailUrl":"https://i.ytimg.com/vi/cyW2ajAVyfA/maxresdefault.jpg","title":"Nightcore - Take A Hint","video_id":"cyW2ajAVyfA","length_seconds":"127","author":{"id":"UCqX8hO4JWM6IJfEabbZmhUw","name":"NightcoreReality","avatar":"https://yt3.ggpht.com/a-/AJLlDp2gDuQQWMof2LiR_aE9rYwpeV9FbVw2Klos=s88-mo-c-c0xffffffff-rj-k-no","user":"NightcoreReality","channel_url":"https://www.youtube.com/channel/UCqX8hO4JWM6IJfEabbZmhUw","user_url":"https://www.youtube.com/user/NightcoreReality"},"formats":{"High Quality (720p)":{"type":"video/mp4; codecs=\"avc1.64001F, mp4a.40.2\"","quality":"hd720","url":"https://r4---sn-n4v7knls.googlevideo.com/videoplayback?lmt=1518405333556489&id=o-ALTu-sHg2c2lir56_Y3Ioup-N--OZMNqdFhZ8zm7Z7JB&ip=73.92.36.135&pl=22&itag=22&dur=127.082&mv=m&source=youtube&ms=au%2Conr&fvip=4&ratebypass=yes&mn=sn-n4v7knls%2Csn-a5meknll&mm=31%2C26&ei=y3zJWsfaO4jQ-wOO6Z_YBw&ipbits=0&initcwndbps=1668750&mime=video%2Fmp4&key=yt6&mt=1523154003&c=WEB&requiressl=yes&sparams=dur%2Cei%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cexpire&expire=1523175724&signature=5DA47CC4546806BD9C83BAC78F2537DF8F3613C9.80827CE2C648EB6FF1C305141583DD106CD7F90D","sp":"signature","s":"8908909F7DC601DD385141503C1FF6BE846C2EC72908.9C3163F8FD7352F87CAB38CDDB6086454CC74AD5D55D5","itag":"22","container":"mp4","resolution":"720p","encoding":"H.264","profile":"high","bitrate":"2-3","audioEncoding":"aac","audioBitrate":192},"Medium Quality (360p)":{"type":"video/mp4; codecs=\"avc1.42001E, mp4a.40.2\"","quality":"medium","url":"https://r4---sn-n4v7knls.googlevideo.com/videoplayback?itag=18&fvip=4&ratebypass=yes&ipbits=0&initcwndbps=1668750&mime=video%2Fmp4&c=WEB&requiressl=yes&clen=5870207&mt=1523154003&lmt=1518404348770726&ip=73.92.36.135&pl=22&dur=127.082&mv=m&source=youtube&ms=au%2Conr&ei=y3zJWsfaO4jQ-wOO6Z_YBw&mn=sn-n4v7knls%2Csn-a5meknll&mm=31%2C26&id=o-ALTu-sHg2c2lir56_Y3Ioup-N--OZMNqdFhZ8zm7Z7JB&key=yt6&gir=yes&sparams=clen%2Cdur%2Cei%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Cratebypass%2Crequiressl%2Csource%2Cexpire&expire=1523175724&signature=D5BD52BF77570046237553EE0BE1C2E64678CC68.8E179B66DF222B3977699B77367927C9873F7B6F","sp":"signature","s":"126126B7F3789C72976377B9967793B222FD66B972E8.86CC87646E2C1EB0EE35573F64007577FB25DB5D5DD5D","itag":"18","container":"mp4","resolution":"360p","encoding":"H.264","profile":"baseline","bitrate":"0.5","audioEncoding":"aac","audioBitrate":96}},"published":1401926400000,"description":"Music: Take A Hint - Victoria Justice and Elizabeth Gillies\nLyrics in the video, enjoy :)\nVarious links are below ~\n\nCheck out my channel's facebook page: https://www.facebook.com/NightcoreRea...\n\nJoin the NightcoreReality community on Dubtrack:\nhttps://www.dubtrack.fm/join/nightcor...\n\nJoin the NightcoreReality community on Discord:\nhttps://discord.gg/ncr\n\nCheck out the Nightcore Forever Project for Nightcore creators and fans on Facebook:\nhttps://www.facebook.com/groups/Night...\n\nSoundcloud: https://soundcloud.com/nightcorereali...\n\nPic Link: http://i.imgur.com/kmqwnjq.jpg\nPic Origin: Manga - Sayori Neko Works (Vanilla and Chocola)","video_url":"https://www.youtube.com/watch?v=cyW2ajAVyfA"}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(search) {
		let videoURLRegex = new RegExp(
			"^(?:https?)?:\\/\\/(?:www\\.)?(?:youtube\\.com\\/watch\\?v=|youtu\\.be\\/)(.+)$"
		);
    let videoIdResults = videoURLRegex.exec(search);
    let videoId;
    if (videoIdResults != null) videoId = videoIdResults[1];

    if (!videoId) return;

    YoutubeService.getVideoInfo(videoId)
      .then(videoInfo => this.setState({ videoInfo }))
      .catch(err => console.error(err));
  }

  handleSubmit(search) {
    
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container} onSubmit={this.handleSubmit}>
        <h1 className={classes.title}>
          Youtube Downloader
        </h1>
        <Search onChange={this.handleChange} onSubmit={this.handleSubmit}/>
        {this.state.videoInfo && <VideoInfo info={this.state.videoInfo} />}
      </div>
    );
  }
}

export default injectSheet(styles)(HomePage);
