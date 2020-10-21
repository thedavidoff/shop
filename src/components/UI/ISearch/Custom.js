import React from "react";
import { connectRefinementList } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch";

function uniqBy(items, property) {
  const seen = {};

  return items.filter((item) => {
    const val = item[property];

    if (seen[val]) {
      return false;
    } else {
      seen[val] = true;
      return true;
    }
  });
}

const indexName = "dev_NAME";
const brandAttribute = "specifications.brand.value";
const limit = 100;
const initialFacets = [];

algoliasearch("I21C32G5C2", "85a7081843a79618290d2c0a18ddf6af")
  .searchForFacetValues([
    {
      indexName,
      params: {
        facetName: brandAttribute,
        facetQuery: "",
        maxFacetHits: limit,
      },
    }
  ])
  .then(([{ facetHits }]) => {
    initialFacets.push(
      ...facetHits.map((facet) => ({
        ...facet,
        label: facet.value,
        value: facet.value,
        isRefined: false,
        count: 0,
      }))
    );
  });

const currentRefinement = new Set();
const Custom = connectRefinementList(({ items, refine }) => {
  const toggle = (item) => {
    currentRefinement.clear();
    item.value.forEach((value) => currentRefinement.add(value));
    refine(item.value);
  };

  const combinedItems = uniqBy([...items, ...initialFacets], "label")
    .slice(0, limit)
    .map((item) => {
      const isRefined = currentRefinement.has(item.label);
      const value =
        isRefined === false
          ? [...currentRefinement, item.label]
          : [...currentRefinement].filter((label) => label !== item.label);

      return {
        ...item,
        isRefined,
        value,
      };
    });

  return (
    <div>
      <ul>
        {combinedItems.map((item, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={item.isRefined}
                onChange={() => toggle(item)}
              />
              <span>
                {item.label}: ({item.count})
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Custom;
