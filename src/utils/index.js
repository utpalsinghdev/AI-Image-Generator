import { surpriseMePrompts } from "../constants";
import { saveAs } from "file-saver";
export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(id, photo) {
  try {
    const blob = await fetch(photo).then((r) => r.blob());
    saveAs(blob, `downloadImage${id}.png`);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
}
