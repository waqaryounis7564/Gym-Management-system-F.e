import _ from "lodash";

export default function(items, pageSize, currentPage) {
  let startIndex = (currentPage - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
