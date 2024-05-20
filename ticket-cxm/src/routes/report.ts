// import express, { Request, Response } from "express"
// import { isManager, requireAuth, validateRequest } from "@ticketscx/common"
// import { body } from "express-validator"
// import sequelize from "../config/database"

// import Ticket from "../models/ticket.model"
// import TicketReply from "../models/ticketReply.model"
// import { Op } from "sequelize"

// const router = express.Router()

// // User Story 3.5: Generate Reports
// router.get('/reports', isManager, async (req: Request, res: Response) => {
//     try {
//       const { startDate, endDate } = req.query;
//       const dateFilters = {};

//       if (startDate) {
//         dateFilters['createdAt'] = { [Op.gte]: new Date(startDate) };
//       }
//       if (endDate) {
//         dateFilters['createdAt'] = {
//           ...dateFilters['createdAt'],
//           [Op.lte]: new Date(endDate),
//         };
//       }

//       const totalTickets = await Ticket.count();
//       const openTickets = await Ticket.count({ where: { status: 'open' } });
//       const closedTickets = await Ticket.count({ where: { status: 'closed' } });
//       const averageResolutionTime = await Ticket.findAll({
//         where: {
//           status: 'closed',
//           ...dateFilters,
//         },
//         attributes: [
//           [
//             sequelize.fn('AVG', sequelize.col('closedAt') - sequelize.col('createdAt')),
//             'averageResolutionTime',
//           ],
//         ],
//         raw: true,
//       });

//       const report = {
//         totalTickets,
//         openTickets,
//         closedTickets,
//         averageResolutionTime: averageResolutionTime[0].averageResolutionTime,
//       };

//       res.json(report);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });
