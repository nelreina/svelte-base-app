export const serializePOJO = async (obj) => {
	return JSON.parse(JSON.stringify(obj));
};
