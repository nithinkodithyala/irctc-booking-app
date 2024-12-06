import { Transaction } from 'sequelize';
import Train from '../models/Train.js';
import sequelize from '../config/db.js';

export const addTrain = async (req, res) => {
  try {
    const { name, source, destination, totalSeats, departureTime, arrivalTime } = req.body;

    const train = await Train.create({
      name,
      source,
      destination,
      totalSeats,
      availableSeats: totalSeats,
      departureTime,
      arrivalTime,
    });

    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAvailability = async (req, res) => {
  try {
    const { source, destination } = req.query;

    const trains = await Train.findAll({
      where: {
        source,
        destination,
      },
      attributes: ['id', 'name', 'availableSeats', 'departureTime', 'arrivalTime'],
    });

    res.json(trains);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const bookSeat = async (req, res) => {
  const t = await sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE
  });

  try {
    const { trainId } = req.body;
    const userId = req.user.id;

    const train = await Train.findByPk(trainId, { transaction: t });

    if (!train) {
      await t.rollback();
      return res.status(404).json({ message: 'Train not found' });
    }

    if (train.availableSeats <= 0) {
      await t.rollback();
      return res.status(400).json({ message: 'No seats available' });
    }

    const booking = await Booking.create({
      userId,
      trainId,
      seatNumber: train.totalSeats - train.availableSeats + 1,
    }, { transaction: t });

    train.availableSeats -= 1;
    await train.save({ transaction: t });

    await t.commit();
    res.status(201).json(booking);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: 'Server error' });
  }
};