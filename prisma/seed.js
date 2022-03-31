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
	});

	console.log('Customer created', createdCustomer);

	// Add your code here

	const createdMovie = await prisma.movie.create({
		data: {
			title: 'Interstellar',
			runTimeMins: 169,
		},
	});

	console.log('Movie created', createdMovie);

	const createdScreen = await prisma.screen.create({
		data: {
			number: 1,
		},
	});

	console.log('Screen created', createdScreen);

	const createdScreening = await prisma.screening.create({
		data: {
			startsAt: date,
			screen: {
				connect: {
					id: createdScreen.id,
				},
			},
			movie: {
				connect: {
					id: createdMovie.id,
				},
			},
		},
	});

	console.log('Screening created', createdScreening);

	const createdTicket = await prisma.ticket.create({
		data: {
			screening: {
				connect: {
					id: createdScreening.id,
				},
			},
			customer: {
				connect: {
					id: createdCustomer.id,
				},
			},
		},
	});

	console.log('Ticket created', createdTicket);

	// Don't edit any of the code below this line
	process.exit(0);
}

seed().catch(async (error) => {
	console.error(error);
	await prisma.$disconnect();
	process.exit(1);
});
