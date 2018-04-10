import Dexie from "dexie";

const DB_VERSION = 1;

let db;

export function init() {
  db = new Dexie("YoutubeManagerDatabase");
  db.version(DB_VERSION).stores({
    videos: "id, info, blob"
  });
}

export function addVideo(id, info, blob) {
  return db.videos.add({
    id, info, blob
  });
}

export function getVideo(videoId) {
  return db.videos.get(videoId);
}
