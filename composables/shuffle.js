import seedrandom from 'seedrandom'

export const shuffle = (array) => {
	const { token } = useStore()
	const rng = seedrandom(token)
	const size = array.length
	const idxs = Array.from({ length: size }, (_, idx) => ({ idx, rng: rng() }))
	idxs.sort((a, b) => a.rng - b.rng)
	const shuffled = idxs.map(({ idx }) => array[idx])
	return shuffled
}
