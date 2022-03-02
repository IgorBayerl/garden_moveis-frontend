import React, { useEffect } from "react";
import Card from "./Card";
import { IProduct } from "../interfaces/data";
import imagesLoaded from "imagesloaded";

interface Props {
  children?: React.ReactNode;
  items: IProduct[];
}

const Masonry: React.FC<Props> = ({ items }) => {
  const resizeMasonryItem = (item: any) => {
    const grid = document.getElementsByClassName("masonry")[0];
    const rowGap =
      parseInt(
        window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
      ) || 0;
    const rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );

    const masonryContent = item.querySelector(".masonry-content");

    if (masonryContent) {
      const rowSpan = Math.ceil(
        (masonryContent.getBoundingClientRect().height + rowGap) /
          (rowHeight + rowGap)
      );
      item.style.gridRowEnd = "span " + rowSpan;
    }
  };

  const resizeAllMasonryItems = () => {
    console.log("resizeAllMasonryItems");
    const allItems = document.querySelectorAll(".masonry-item");
    if (allItems.length > 0) {
      allItems.forEach((item: any) => {
        resizeMasonryItem(item);
      });
    }
  };

  useEffect(() => {
    waitForImages();
  }, [items]);

  const waitForImages = () => {
    const allItems = document.querySelectorAll(".masonry-item");
    if (allItems.length > 0) {
      allItems.forEach((item: any) => {
        imagesLoaded(item, () => {
          resizeMasonryItem(item);
        });
      });
    }
  };

  useEffect(() => {
    waitForImages();
    window.addEventListener("load", resizeAllMasonryItems);
    window.addEventListener("resize", resizeAllMasonryItems);
    return () => {
      window.removeEventListener("load", resizeAllMasonryItems);
      window.removeEventListener("resize", resizeAllMasonryItems);
    };
  }, []);

  return (
    <div className="flex masonryContainer justify-center ">
      <div className="masonry sm:masonry-sm lg:masonry-lg">
        {items?.map((item) => (
          <div className="masonry-item">
            <Card key={item.id} item={item}></Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Masonry;
