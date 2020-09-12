import React, { useState } from "react";
import * as PropTypes from "prop-types";

import styles from "./Slider.module.css";
import Preloader from "../../../../UI/Preloader/Preloader";

const Slider = ({ product }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(1);
  const [zoomShow, setZoomShow] = useState(false);
  const [cPhoto, setCPhoto] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });
  const [originalPhotoSize, setOriginalPhotoSize] = useState({
    width: 0,
    height: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [cMouse, setCMouse] = useState({ top: 0, left: 0 });
  const [cCursor, setCCursor] = useState({ top: 0, left: 0 });

  let wCursor = 0;
  let hCursor = 0;

  const zoomActivate = (e) => {
    setSelectedPhoto(selectedPhoto);
    const current = product.photos.find((photo) => photo.id === selectedPhoto)
      .original;
    const widthPos = current.indexOf("~");
    const heightPos = current.lastIndexOf("~");
    const dotPos = current.lastIndexOf(".");
    const width = current.slice(widthPos + 1, heightPos);
    const height = current.slice(heightPos + 1, dotPos);
    setOriginalPhotoSize({ width, height });

    const rect = e.target.getBoundingClientRect();
    setCPhoto({
      top: rect.top + window.pageYOffset,
      right: rect.right + window.pageXOffset,
      bottom: rect.bottom + window.pageYOffset,
      left: rect.left + window.pageXOffset,
    });

    setZoomShow(true);
  };

  const ratioWidthHeight =
    (originalPhotoSize.width / originalPhotoSize.height) * 240;
  const ratioHeightWidth =
    (originalPhotoSize.height / originalPhotoSize.width) * 320;

  let difWidth = 0;
  let difHeight = 0;

  let x = 0;
  let y = 0;

  const cCenterCursor = {
    top: cPhoto.top,
    right: cPhoto.right,
    bottom: cPhoto.bottom,
    left: cPhoto.left,
  };

  const loadSuccess = () => setIsLoaded(true);

  if (originalPhotoSize.width > 500 || originalPhotoSize.height > 350) {
    if (ratioWidthHeight <= 320) {
      difWidth = Math.floor(320 - ratioWidthHeight);

      wCursor = Math.floor((500 / originalPhotoSize.width) * (320 - difWidth));
      hCursor = Math.floor(wCursor * (350 / 500));

      y = Math.floor(difWidth / 2);
      let startPosY = Math.floor(difWidth / 2);

      cCenterCursor.top = Math.floor(cPhoto.top + hCursor / 2);
      cCenterCursor.bottom = Math.floor(cPhoto.bottom - hCursor / 2);
      cCenterCursor.right = Math.floor(
        cPhoto.right - wCursor / 2 - difWidth / 2
      );
      cCenterCursor.left = Math.floor(cPhoto.left + wCursor / 2 + difWidth / 2);

      if (cMouse.top > cCenterCursor.top)
        // когда курсор мыши ниже верхнего центра
        x = Math.min(
          240 - hCursor,
          Math.floor(
            cCursor.top - hCursor / 2 < 0 ? 0 : cCursor.top - hCursor / 2
          )
        );
      if (cMouse.top > cCenterCursor.bottom) x = 240 - hCursor; // когда курсор мыши ниже нижнего центра

      if (cCenterCursor.left < cCenterCursor.right) {
        // когда левая позиция центра меньше правой
        if (cMouse.left > cCenterCursor.left)
          // когда курсор мыши правее позиции левого центра
          y = Math.max(
            startPosY,
            Math.floor(cCursor.left - wCursor / 2 - difWidth / 2)
          );
        if (cMouse.left > cCenterCursor.right)
          // когда курсор мыши правее позиции правого центра
          y = Math.ceil(320 - wCursor - difWidth / 2);
      }
    } else {
      difHeight = 240 - ratioHeightWidth;

      hCursor = Math.floor(
        (350 / originalPhotoSize.height) * (240 - difHeight)
      );
      wCursor = Math.floor((500 / originalPhotoSize.width) * (320 - difWidth));
      // wCursor = hCursor * (500 / 350);

      x = Math.floor(difHeight / 2);
      let startPosX = Math.floor(difHeight / 2);

      cCenterCursor.top = Math.floor(cPhoto.top + hCursor / 2 + difHeight / 2);
      cCenterCursor.bottom = Math.floor(
        cPhoto.bottom - hCursor / 2 - difHeight / 2
      );
      cCenterCursor.right = Math.floor(cPhoto.right - wCursor / 2);
      cCenterCursor.left = Math.floor(cPhoto.left + wCursor / 2);

      if (cMouse.left > cCenterCursor.left)
        y = Math.min(Math.ceil(320 - wCursor), Math.floor(
          cCursor.left - wCursor / 2 < 0 ? 0 : cCursor.left - wCursor / 2
        ));
      if (cMouse.left > cCenterCursor.right) y = Math.ceil(320 - wCursor);

      if (cCenterCursor.top > cCenterCursor.bottom) {
        if (cPhoto.bottom < cPhoto.top + hCursor + difHeight / 2) {
          hCursor = Math.floor(240 - difHeight / 2);
        }
      } else {
        if (cMouse.top > cCenterCursor.top) {
          x = Math.max(startPosX, Math.floor(
            cCursor.top - hCursor / 2 - difHeight / 2
          ));
          //console.log(x)
        }
        if (cMouse.top > cCenterCursor.bottom)
          x = Math.ceil(240 - hCursor - difHeight / 2);
      }
    }
  } else {
    wCursor = 320;
    hCursor = 240;
  }

  const mouseMove = (e) => {
    setCMouse({ top: e.pageY, left: e.pageX });

    let cCursorTop = cMouse.top - cPhoto.top;
    if (cCursorTop <= 0) cCursorTop = 0;

    let cCursorLeft = cMouse.left - cPhoto.left;
    if (cCursorLeft <= 0) cCursorLeft = 0;

    setCCursor({
      top: Math.floor(cCursorTop + difHeight / 2),
      left: Math.floor(cCursorLeft + difWidth / 2),
    });
  };

  const zoomDeactivate = () => {
    // wCursor = 0;
    // hCursor = 0;
    setZoomShow(false);
    setIsLoaded(false);
  };

  //console.log(-(x - difHeight / 2) * (352 / hCursor));
  //console.log(-(y - difWidth / 2) * (502 / wCursor));

  return (
    <div className={styles.photoBlock}>
      <div
        onMouseEnter={zoomActivate}
        onMouseMove={mouseMove}
        onMouseLeave={zoomDeactivate}
        style={{ cursor: "pointer", position: "relative", height: "240px" }}
      >
        <img
          src={
            selectedPhoto
              ? product.photos.find((photo) => photo.id === selectedPhoto).w320
              : product.poster
          }
          alt={product.name}
        />
        {zoomShow && isLoaded && (
          <div
            className={styles.cursor}
            style={{
              width: wCursor + "px",
              height: hCursor + "px",
              top: x + "px",
              left: y + "px",
            }}
          >
            {" "}
          </div>
        )}
      </div>
      {zoomShow && (
        <div className={styles.zoom}>
          {product.photos.find((photo) => photo.id === selectedPhoto) && (
            <>
              {!isLoaded && <Preloader />}
              <img
                onLoad={loadSuccess}
                style={{
                  top: Math.ceil(-(x - difHeight / 2) * (352 / hCursor)) + "px",
                  left: Math.ceil(-(y - difWidth / 2) * (502 / wCursor)) + "px",
                }}
                className={styles.img}
                src={
                  product.photos.find((photo) => photo.id === selectedPhoto)
                    .original
                }
                alt={product.name}
              />
            </>
          )}
        </div>
      )}
      <ul className={styles.photoSlider}>
        {product.photos.map((photo) => (
          <li key={photo.id}>
            <img
              src={photo.thumbnail}
              alt={product.name}
              className={
                selectedPhoto === photo.id ? styles.selectedPhoto : null
              }
              onMouseOver={() => setSelectedPhoto(photo.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

Slider.propTypes = {
  product: PropTypes.PropTypes.shape({
    photos: PropTypes.array,
    poster: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default Slider;
