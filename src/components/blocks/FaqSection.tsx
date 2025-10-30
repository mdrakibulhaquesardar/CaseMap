
'use client';

import React from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

export function FaqSection({ items, title, description, contactLinkText, contactLinkHref }: { 
    items: { id: string; title: string; content: string }[];
    title: string;
    description: string;
    contactLinkText: string;
    contactLinkHref: string;
}) {
	return (
		<div className="mx-auto w-full max-w-3xl space-y-7 px-4 py-16">
			<div className="space-y-2 text-center">
				<h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
				<p className="text-muted-foreground max-w-2xl mx-auto">
					{description}
				</p>
			</div>
			<Accordion
				type="single"
				collapsible
				className="bg-card dark:bg-card/50 w-full -space-y-px rounded-lg "
				defaultValue="item-1"
			>
				{items.map((item) => (
					<AccordionItem
						value={item.id}
						key={item.id}
						className="relative border-x first:rounded-t-lg first:border-t last:rounded-b-lg last:border-b"
					>
						<AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline text-left">
							{item.title}
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground pb-4 px-4">
							{item.content}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
			<p className="text-muted-foreground text-center">
				{contactLinkText}{' '}
				<a href={contactLinkHref} className="text-primary hover:underline">
					গ্রাহক সহায়তা দলের
				</a>
                {' '} সাথে যোগাযোগ করুন
			</p>
		</div>
	);
}
