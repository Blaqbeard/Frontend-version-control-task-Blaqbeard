// story-print: minimal CLI that prints a short story chapter

const chapter = process.env.CHAPTER || "0";

function printChapter(selectedChapter) {
  const chapters = {
    "0": "Chapter 0: The story begins with a single commit.",
  };

  const text = chapters[selectedChapter] || `Chapter ${selectedChapter}: (not written yet)`;
  console.log(text);
}

printChapter(chapter);


