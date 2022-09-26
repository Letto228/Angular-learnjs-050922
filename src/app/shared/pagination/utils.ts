export function groupingItemsByElementsSize<T>(items: T[], elementsSize: number): Array<T[]> {
	return items.reduce(
		(groupedItems: Array<T[]>, item: T) => {
			const groupedItemsLastIndex = groupedItems.length - 1;

			if (groupedItems[groupedItemsLastIndex].length < elementsSize) {
				groupedItems[groupedItemsLastIndex].push(item);

				return groupedItems;
			}

			return [...groupedItems, [item]];
		},
		[[]],
	);
}
