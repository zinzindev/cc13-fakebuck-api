module.exports = (reg, res, next) => {
	res.status(404).json({ message: 'resource nor found on this server' });
};
