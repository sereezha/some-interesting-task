export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const shuffleArray = <T>(initialArray: T[]) => {
  const array = [...initialArray];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export const extend = <ObjA, ObjB>(a: ObjA, b: ObjB): ObjA & ObjB => ({
  ...a,
  ...b,
});
