```
auth
    routes
          export * as AuthRoutes;
    controllers
               export * as AuthControllers;
    middlewares:
               export * as AuthMiddlewares
     
    helpers:
            export * as AuthHelpers

index.ts
        import routes from "./routes"
        import controller from "./routes"
        import helpers from "./routes"
        import middlewares from "./routes"

 export {routes, contoller, helper, middlewares} 
```      

 # Auth Routes

 * POST auth/signup
 * POST auth/login
 * PATCH auth/forgot
 * PUT auth/reset

 # Profile Routes

 * profile/:id
 


