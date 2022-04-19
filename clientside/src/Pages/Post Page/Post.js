import React from "react";
import "./Post.css";

function Post() {
  return (
    <div className="post-page">
      <h3>Sports</h3>
      <div className="postpage-image">
        <img
          src={require("../../Images/luxury-purple-color-cylinder-pedestal-podium-product-presentation-3d-rendering_41470-4246.webp")}
          alt={"pic"}
        />
      </div>
      <div className="post-title">
        <h2> Things I wished I knew Before Going To Ukraine</h2>
        <h4> Saraki Oladimeji</h4>
        <span>8 Days Ago</span>
      </div>
      <div className="post-content">
        <p>
          The clowns had taken over. And yes, they were literally clowns. Over
          100 had appeared out of a small VW bug that had been driven up to the
          bank. Now they were all inside and had taken it over. It was a simple
          green chair. There was nothing extraordinary about it or so it seemed.
          It was the type of chair one would pass without even noticing it was
          there, let alone what the actual color of it was. It was due to this
          common and unassuming appearance that few people actually stopped to
          sit in it and discover its magical powers. There weren't supposed to
          be dragons flying in the sky. First and foremost, dragons didn't
          exist. They were mythical creatures from fantasy books like unicorns.
          This was something that Pete knew in his heart to be true so he was
          having a difficult time acknowledging that there were actually
          fire-breathing dragons flying in the sky above him. She glanced up
          into the sky to watch the clouds taking shape. First, she saw a dog.
          Next, it was an elephant. Finally, she saw a giant umbrella and at
          that moment the rain began to pour. The coin hovered in the air,
          spinning over and over again. It reached its peak and began to
          descend. Both boys were pleading with it to land a certain way but the
          coin had already made up its mind on what it was going to do. He heard
          the song coming from a distance, lightly floating over the air to his
          ears. Although it was soft and calming, he was wary. It seemed a
          little too soft and a little too calming for everything that was going
          on. He wanted it to be nothing more than beautiful music coming from
          the innocent and pure joy of singing, but in the back of his mind, he
          knew it was likely some type of trap.
        </p>
      </div>
    </div>
  );
}

export default Post;
