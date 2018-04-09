import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import rootReducer from "../reducers";
import rootSaga from "../sagas";

export default function configureStore(initialState) {
	const sagaMiddleware = createSagaMiddleware();

	const middleware = process.env.NODE_ENV !== "production"
		? [
			require("redux-immutable-state-invariant").default(),
			sagaMiddleware
		]
		: [
			sagaMiddleware
		];

	const store = createStore(
		rootReducer,
		initialState,
		process.env.NODE_ENV !== "production"
			? require("redux-devtools-extension").composeWithDevTools(
				applyMiddleware(...middleware)
			)
			: applyMiddleware(...middleware)
	);

	sagaMiddleware.run(rootSaga);

	return store;
}
