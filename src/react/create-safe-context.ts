import { createContext, useContext } from 'react';

/**
 * 영역 내 Provider 존재 여부와 상관없이 확정된 타입을 가지는 Context 생성 함수
 *
 * @example
 * const [useUser, UserProvider] = createSafeContext<{
 *   name: string;
 * }>();
 *
 * const User = () => {
 *  const user = createSafeContext(); // { name: string }
 *  return <div>{user.name}</div>;
 * }
 */
export const createSafeContext = <T>() => {
	const context = createContext<T | null>(null);

	const useRequiredContext = (): T => {
		const contextValue = useContext(context);

		if (contextValue === null) {
			throw new Error(`"${context.Consumer.name}" context value is null'`);
		}

		return contextValue;
	};

	return [useRequiredContext, context.Provider] as const;
};
