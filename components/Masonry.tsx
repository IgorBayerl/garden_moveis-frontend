import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { IProduct } from "../interfaces/data";
import imagesLoaded from "imagesloaded";
import { GlobalDataContext } from "./Context";

interface Props {
  children?: React.ReactNode;
  items: IProduct[];
}

const Masonry: React.FC<Props> = ({ items }) => {
  const { globalCategoriesData } = useContext(GlobalDataContext);
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
      /* Make the images take all the available space in the cell/item */
      // masonryContent.style.height = rowSpan * 10 + "px";
    }
  };

  const resizeAllMasonryItems = () => {
    console.log("resizeAllMasonryItems");
    const allItems = document.querySelectorAll(".masonry-item");
    allItems.forEach((item: any) => {
      resizeMasonryItem(item);
    });
  };

  const wantForSeconds = (seconds: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, seconds * 1000);
    });
  };

  useEffect(() => {
    // resizeAllMasonryItems();
    waitForImages();
    // resizeAllMasonryItems();
  }, [items]);

  const waitForImages = () => {
    const allItems = document.querySelectorAll(".masonry-item");
    allItems.forEach((item: any) => {
      imagesLoaded(item, () => {
        resizeMasonryItem(item);
      });
    });
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
  // return (
  //   <div className=" flex masonryContainer justify-center man">
  //     <div className="masonry sm:masonry-sm lg:masonry-lg">
  //       {items?.map((item) => (
  //         <div className="masonry-item">
  //           <img
  //             className="masonry-content"
  //             src={item.pictures[0].url}
  //             alt={`Imagem do produto: ${item.title}`}
  //             onError={({ currentTarget }) => {
  //               currentTarget.onerror = null; // prevents looping
  //               currentTarget.src = "/no-image.png";
  //             }}
  //           />
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default Masonry;
