import type { FAQItem } from "@/types";

export function parseFAQ(content: string): { beforeFaq: string; faqItems: FAQItem[]; afterFaq: string } {
  const faqHeadingRegex = /^##\s+Frequently Asked Questions\s*$/m;
  const nextHeadingRegex = /^##\s+/m;

  const headingMatch = content.match(faqHeadingRegex);
  if (!headingMatch) {
    return { beforeFaq: content, faqItems: [], afterFaq: "" };
  }

  const faqStart = headingMatch.index!;
  const beforeFaq = content.slice(0, faqStart);

  const afterFaqStart = faqStart + headingMatch[0].length;
  const remaining = content.slice(afterFaqStart);

  // Find the next h2 heading after the FAQ section
  const nextHeading = remaining.match(nextHeadingRegex);
  let faqBlock: string;
  let afterFaq: string;
  if (nextHeading) {
    faqBlock = remaining.slice(0, nextHeading.index);
    afterFaq = remaining.slice(nextHeading.index);
  } else {
    faqBlock = remaining;
    afterFaq = "";
  }

  // Parse Q&A pairs
  const items: FAQItem[] = [];
  const lines = faqBlock.split("\n");
  let currentQ = "";
  let currentA = "";

  for (const line of lines) {
    const qMatch = line.match(/^\*\*Q:\*\*\s*(.+)$/);
    const aMatch = line.match(/^\*\*A:\*\*\s*(.+)$/);

    if (qMatch) {
      if (currentQ && currentA) {
        items.push({ question: currentQ.trim(), answer: currentA.trim() });
      }
      currentQ = qMatch[1];
      currentA = "";
    } else if (aMatch) {
      currentA = aMatch[1];
    } else if (currentA && line.trim()) {
      // Continuation of answer
      currentA += " " + line.trim();
    }
  }

  if (currentQ && currentA) {
    items.push({ question: currentQ.trim(), answer: currentA.trim() });
  }

  // If no structured Q&A was found, treat the entire FAQ block as markdown
  if (items.length === 0) {
    return {
      beforeFaq,
      faqItems: [],
      afterFaq: content.slice(faqStart + headingMatch[0].length),
    };
  }

  return { beforeFaq, faqItems: items, afterFaq };
}
