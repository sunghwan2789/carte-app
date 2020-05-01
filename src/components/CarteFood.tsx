import React, { useMemo } from 'react';
import { useHighlights } from '../contexts/HighlightsContext';

type CarteFoodProps = {
  food: string;
};

export default function CarteFood({ food }: CarteFoodProps) {
  const [highlights] = useHighlights();

  const { titleChunks, styleChunks } = useMemo(() => {
    const titleChunks = Array.from(Array(food.length), () => '');
    const styleChunks = Array.from(Array(food.length), () => ({}));

    [...highlights!].reverse().forEach((highlight) => {
      highlight.words.forEach((word) => {
        let i = -1;
        while ((i = food.indexOf(word, i + 1)) !== -1) {
          for (let j = 0; j < word.length; j++) {
            titleChunks[i + j] += `${highlight.name} `;
            Object.assign(styleChunks[i + j], highlight.style);
          }
        }
      });
    });

    return { titleChunks, styleChunks };
  }, [highlights, food]);

  return (
    <>
      {food.split('').map((char, i) => (
        <span key={i} title={titleChunks[i]} style={styleChunks[i]}>
          {char}
        </span>
      ))}
    </>
  );
}
