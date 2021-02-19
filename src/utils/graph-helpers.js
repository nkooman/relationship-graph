import { getRandomIntInclusive } from "@/utils/integer-helpers";

export const createNodes = items => items.map(item => ({ name: item }));
export const createRandomLinks = nodes =>
  nodes.reduce((accumulator, value) => {
    const numberOfRandomConnections = value.name === "BizStream" ? getRandomIntInclusive(3)(6) : getRandomIntInclusive(0)(2);
    const randomConnections = [];
    const otherNodes = nodes.filter(node => node !== value);

    for (let i = 0; i < numberOfRandomConnections; i += 1) {
      randomConnections.push(otherNodes[getRandomIntInclusive(0)(otherNodes.length - 1)]);
    }

    const links = randomConnections.map(connection => ({
      source: value.name,
      target: connection.name
    }));

    return [...accumulator, ...links];
  }, []);

export const createLinks = source => targets => {
  return targets.map(target => {
    if (source.toLowerCase() === target.toLowerCase()) return;

    return {
      source,
      target
    };
  });
};
