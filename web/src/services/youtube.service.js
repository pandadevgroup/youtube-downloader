export function getVideoInfo(videoId) {
	return fetch(`/api/getInfo/${videoId}`)
    .then(response => response.json())
    .then(info => parseInfo(info));
}

function parseInfo(data) {
  let selectedEncoding = "H.264";
  return {
    thumbnailUrl: "https://i.ytimg.com/vi/" + data.video_id + "/maxresdefault.jpg",
    title: data.title,
    video_id: data.video_id,
    length_seconds: data.length_seconds,
    author: data.author,
    formats: parseFormats(data.fmt_list, data.formats, selectedEncoding),
    published: data.published,
    description: data.description,
    video_url: data.video_url
  };
}

function parseFormats(fmt_list, formats, selectedEncoding) {
  let parsed = {};
  let resolutionToNameMap = {
    "176x144": "Very Low Quality (144p)",
    "320x180": "Low Quality (180p)",
    "640x360": "Medium Quality (360p)",
    "1280x720": "High Quality (720p)"
  };
  for (let i = 0; i < fmt_list.length; i++) {
    let tag = fmt_list[i][0];
    let resolution = fmt_list[i][1];
    let format = getFormatFromTag(tag, formats);
    if (!format || format.encoding !== selectedEncoding) continue;

    let name = resolutionToNameMap[resolution] || "Unknown (" + resolution + ")";

    parsed[name] = format;
  }

  // TEMPORARY AUDIO SOLUTION
  // parsed["Audio Only (m4a)"] = getFormatFromTag("140", formats);

  return parsed;
}

function getFormatFromTag(tag, formats) {
  for (let i = 0; i < formats.length; i++) {
    if (formats[i].itag === tag) return formats[i];
  }
  return null;
}
