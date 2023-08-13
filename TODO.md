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

- POST auth/signup
- POST auth/login
- PATCH auth/forgot
- PUT auth/reset

# Interviews Routes

<!-- filter out the "interviews" by priority: high, medium, low -->

- interviews?status="high"
<!-- all canidates on an interview with/without filters  -->
- interviews/:id/candidates?status=accepted
<!-- know the detail of a specific interviewee  -->
- interviews/:id/candidates/:id
<!-- detail of a specific interview -->
- interview/:id
