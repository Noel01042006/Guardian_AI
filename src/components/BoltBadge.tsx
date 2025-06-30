import React from "react";

const CustomBoltBadge: React.FC = () => {
  return (
    <a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-4 right-4 z-50"
      aria-label="Made with Bolt.new"
    >
      <picture>
        <source
          srcSet="https://pbs.twimg.com/profile_images/1880702021122342912/fe9TlQqJ_400x400.jpg"
          media="(prefers-color-scheme: dark)"
        />
        <img
          src="https://pbs.twimg.com/profile_images/1880702021122342912/fe9TlQqJ_400x400.jpg"
          alt="Made in Bolt.new"
          className="w-16 h-16"
        />
      </picture>
    </a>
  );
};

export default CustomBoltBadge;
