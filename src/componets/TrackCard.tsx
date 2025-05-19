"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Track {
  id: number;
  title: string;
  artist: string;
  cover: string;
}

interface AudioSliderProps {
  tracks: Track[];
}

const AudioSlider = ({ tracks }: AudioSliderProps) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragMoved = useRef(false);
  const mouseDownX = useRef(0);
  const mouseDownY = useRef(0);
  const router = useRouter();

  //스크롤 속도 조정 1 = 기본속도
  const scrollSpeed = 1;

  const CARD_WIDTH = 192; // w-48 = 12rem = 192px
  const CARD_MARGIN = 16; // m-2 = 0.5rem = 8px * 2 (양쪽)
  const CARD_TOTAL = CARD_WIDTH + CARD_MARGIN;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    isDown.current = true;
    dragMoved.current = false;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
    mouseDownX.current = e.pageX;
    mouseDownY.current = e.pageY;
    sliderRef.current.style.cursor = "grabbing";
    window.addEventListener("mousemove", handleMouseMove as any);
    window.addEventListener("mouseup", handleMouseUp as any);
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    if (sliderRef.current) sliderRef.current.style.cursor = "grab";
    window.removeEventListener("mousemove", handleMouseMove as any);
    window.removeEventListener("mouseup", handleMouseUp as any);
  };

  const handleMouseUp = (e?: MouseEvent) => {
    isDown.current = false;
    if (sliderRef.current) sliderRef.current.style.cursor = "grab";
    window.removeEventListener("mousemove", handleMouseMove as any);
    window.removeEventListener("mouseup", handleMouseUp as any);
    // 클릭 판정: 드래그 거리가 5px 이하
    if (e && Math.abs(e.pageX - mouseDownX.current) < 5 && Math.abs(e.pageY - mouseDownY.current) < 5) {
      // 클릭 위치에서 카드 index 계산
      if (!sliderRef.current) return;
      const clickX = e.pageX - sliderRef.current.getBoundingClientRect().left + sliderRef.current.scrollLeft;
      const idx = Math.floor(clickX / CARD_TOTAL);
      if (idx >= 0 && idx < tracks.length) {
        // next/router의 push만 사용하여 CSR 이동만 하도록 수정
        router.push(`/play/${tracks[idx].id}`);
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDown.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * scrollSpeed;
    if (Math.abs(walk) > 5) dragMoved.current = true;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div ref={sliderRef} className="hover:overflow-x-scroll overflow-hidden whitespace-nowrap relative" onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} style={{ userSelect: "none" }}>
      {/* 카드 리스트 */}
      {tracks.map((track, index) => (
        <div key={index} className="inline-block w-48 h-48 m-2 bg-gray-300 rounded-lg flex-shrink-0">
          <img src={track.cover} alt={track.title} className="w-full h-full object-cover rounded-lg pointer-events-none" draggable={false} />
        </div>
      ))}
      {/* 투명 클릭/드래그 레이어 */}
      <div
        className="absolute inset-0 z-10 cursor-grab"
        style={{ background: "rgba(0,0,0,0)", pointerEvents: "auto" }}
        onMouseDown={handleMouseDown}
        // onMouseUp은 window에 등록되어 있음
      />
    </div>
  );
};

export default AudioSlider;
