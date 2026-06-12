const delays = [0, 1000, 3000, 5000, 10000] as const;
const getRandomDelay = () => Math.floor(Math.random() * 5000) + 5000;

export const getNextDelay = (attempts: number) => {
    if (attempts < delays.length) {
        return delays[attempts];
    }
    return getRandomDelay();
};
