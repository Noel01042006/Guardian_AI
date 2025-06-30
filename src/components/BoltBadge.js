import { BoltBadge } from "bolt-hackathon-badge";

export default function CustomBoltBadge() {
  return (
    <a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      style={{ position: "fixed", top: "10px", right: "10px", zIndex: 9999 }}
    >
      <BoltBadge colorTheme="auto" />
    </a>
  );
}
