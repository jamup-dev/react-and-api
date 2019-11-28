import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { useSession } from "../../utils/auth";
import { endpoint } from "../../utils/endpoint";

export default function Home() {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);

  // use effect to load songs data from server
  useEffect(() => {
    // if not logged in, then bail
    if (!session.isAuthenticated) {
      return;
    }

    // load songs data
    setLoading(true);
    axios
      .get(`${endpoint}/songs/`, {
        headers: {
          Authorization: `Bearer ${session.token}`
        }
      })
      .then(response => {
        console.log(response.data);
        setSongs(response.data);
      })
      .catch(e => {
        alert(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [session]);

  // redirect to /signin if not authenticated
  if (!session.isAuthenticated) {
    return <Redirect to="/signin" />;
  }

  return loading ? (
    <div className="box">
      <progress className="progress is-large is-info" max="100">
        60%
      </progress>
    </div>
  ) : (
    <div className="columns is-multiline">
      {songs.length ? (
        songs.map(song => (
          <div
            className="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen"
            key={song.id}
          >
            <div className="card">
              <div className="card-image">
                <figure className="image">
                  <img src={song.albumArt} alt={song.name} />
                </figure>
              </div>
              <div className="card-content">
                <p className="title is-4">{song.name}</p>
                <p className="subtitle is-6 is-lowercase">@{song.artist}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="column is-full notification is-danger">No Songs found</p>
      )}
    </div>
  );
}
