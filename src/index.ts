import express from "express";
import { config } from "./config/config";
import userRoute from "./route/user.route";
import gasRoute from "./route/gas.route";
import contactRoute from "./route/contact.route";
import authRoute from "./route/auth.route";
import cors from "cors";
import emailRoute from "./route/email.route";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const port = config.PORT;
const app = express();

let corsOptions = {
    origin: 'https://nogas.ddns.net'
}

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Nogas API',
            version: '1.0.0',
            description: 'API for Users, Emergency Contacts, Gas, Auth and Sending Emails'
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'number'
                        },
                        first_name: {
                            type: 'string'
                        },
                        last_name: {
                            type: 'string'
                        },
                        email: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        },
                        phone: {
                            type: 'string'
                        },
                        isAdmin: {
                            type: 'boolean',
                            default: false
                        }
                    },
                    required: ['id', 'first_name', 'last_name', 'email', 'password', 'phone', 'isAdmin'],
                },
                Gas: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'number'
                        },
                        co2_amount: {
                            type: 'number'
                        },
                        timestamp: {
                            type: 'number'
                        }
                    },
                    required: ['id', 'co2_amount', 'timestamp']
                },
                Contact: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'number'
                        },
                        name: {
                            type: 'string'
                        },
                        email: {
                            type: 'string'
                        },
                        userId: {
                            type: 'string'
                        }
                    },
                    required: ['id', 'name', 'email', 'userId']
                }
            }
        },
        security: [],
    },
    apis: ['./src/route/*.route.ts']
};
const swaggerDocsV1 = swaggerJsdoc(swaggerOptions);
const swaggerUiV1 = swaggerUi.serveFiles(swaggerDocsV1);

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/v1/api-docs', swaggerUiV1, swaggerUi.setup(swaggerDocsV1));

app.use("/api", userRoute);
app.use("/api", gasRoute);
app.use("/api", contactRoute);
app.use("/api", emailRoute)
app.use("/api", authRoute)

export let server = app.listen(port, () => {
    console.log("Listening on port", port);
    console.log("Environment: " + config.ENV);
})

export default app;