import React from "react";

const CustomBoltBadge: React.FC = () => {
  return (
    <a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-4 right-20 z-50"
      aria-label="Made with Bolt.new"
    >
      <img
        src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdev.to%2Fthankamatho%2Fday-3-11fj&psig=AOvVaw0jdq4r7ROiyRlFE9lvq9mH&ust=1751548956361000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLjrvL2ino4DFQAAAAAdAAAAABAE"
        alt="Built with Bolt"
        className="w-32 h-auto"
      />
    </a>
  );
};

export default CustomBoltBadge;
