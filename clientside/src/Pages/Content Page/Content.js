import React from "react";
import "./Content.css";
import imagetwo from "../../Images/luxury-purple-color-cylinder-pedestal-podium-product-presentation-3d-rendering_41470-4246.webp";

function Content() {
  return (
    <div className="content">
      <div className="content-image">
        <img src={imagetwo} alt="Content emblem" />
      </div>
      <div className="content-details">
        <p className="content-category">Sport</p>
        <p className="content-author">Published by Timilein Okunola</p>
        <p className="content-timestamp">Published 3 days ago</p>
      </div>
      <div className="content-story">
        “Ingredients for life,” said the backside of the truck. They mean food,
        but really food is only 1 ingredient of life. Life has so many more
        ingredients such as pain, happiness, laughter, joy, tears, and smiles.
        Life also has hard work, easy play, sleepless nights, and sunbathing by
        the ocean. Love, hatred, envy, self-assurance, and fear could be just
        down aisle 3 ready to be bought when needed. How I wish I could pull
        ingredients like these off shelves in a store. Ten more steps. If he
        could take ten more steps it would be over, but his legs wouldn't move.
        He tried to will them to work, but they wouldn't listen to his brain.
        Ten more steps and it would be over but it didn't appear he would be
        able to do it. It had been her dream for years but Dana had failed to
        take any action toward making it come true. There had always been a good
        excuse to delay or prioritize another project. As she woke, she realized
        she was once again at a crossroads. Would it be another excuse or would
        she finally find the courage to pursue her dream? Dana rose and took her
        first step.
      </div>
    </div>
  );
}

export default Content;
