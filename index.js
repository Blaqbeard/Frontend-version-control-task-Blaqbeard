// story-print: minimal CLI that prints a short story chapter

const chapter = process.env.CHAPTER || "0";

function printChapter(selectedChapter) {
  const chapters = {
    "0": "Chapter 0: The story begins with a single commit.",
    "1": "Chapter 1: A new branch sprouts from main, simple and clean.",
    "2": "Chapter 2: The branch is renamed to tell a clearer tale.",
    "3": "Chapter 3: We rebase to tidy the timeline and keep it linear (vA).",
    "4": "Chapter 4: A merge conflict appears; calm heads prevail.",
  };

  const text = chapters[selectedChapter] || `Chapter ${selectedChapter}: (not written yet)`;
  console.log(text);
}

printChapter(chapter);


