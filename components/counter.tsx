"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { useFormat, useT } from "@/i18n/context";

export const Counter = () => {
	const [count, setCount] = useState(0);
	const t = useT();
	const format = useFormat();

	return (
		<Button radius="full" onPress={() => setCount(count + 1)}>
			{format(t.common.countIs, { count })}
		</Button>
	);
};
