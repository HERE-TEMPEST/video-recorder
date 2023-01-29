todo
Suspense - лоадер пока не пршрузиться елементы дерева

```
export const withRouter = (component: () => React.ReactNode) => () => (
    <BrowserRouter>
        <Suspense fallback="Loading...">
            {component()}
        </Suspense>
    </BrowserRouter>
);
```
