const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const date = new Date(Date.parse('2022-10-01'));

async function seed() {
	const createdCustomer = await prisma.customer.create({
		data: {
			name: 'Alice',
			contact: {
				create: {
					phone: '1234567890',
					email: 'alice@example.com',
				},
			},
		},
		include: {
			contact: true,
		},
	});

	console.log('Customer created', createdCustomer);

	// Add your code hereclaer

	const createdMovie = await prisma.movie.create({
		data: {
			title: 'Interstellar',
			runTimeMins: 169,
			screening: {
				create: {
					startsAt: date,
				},
			},
		},
		include: {
			screening: true,
		},
	});

	// Don't edit any of the code below this line
	process.exit(0);
}

seed().catch(async (error) => {
	console.error(error);
	await prisma.$disconnect();
	process.exit(1);
});
