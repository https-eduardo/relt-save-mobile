import { useCallback, useEffect, useState } from "react";
import AppSelect from "../../../AppSelect";
import { BadgeSelect } from "../../../../shared/interfaces";
import { CardsService } from "../../../../services/cards";

interface CardSelectorProps {
  selected?: string;
  onSelect: (item: string) => void;
}

export default function CardSelector(props: CardSelectorProps) {
  const [cards, setCards] = useState<BadgeSelect[]>([]);
  const [selected, setSelected] = useState(props.selected);

  const fetchCards = useCallback(async () => {
    try {
      const cards = await CardsService.getUserCards();
      const cardsOptions = cards.map((card) => ({
        label: card.name,
        value: card.id.toString(),
      }));
      setCards(cardsOptions);
      if (!props.selected) setSelected(cardsOptions[0]?.value);
    } catch {}
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  useEffect(() => setSelected(props.selected), [props.selected]);

  return (
    <AppSelect
      label="Cartão"
      data={cards}
      selected={selected}
      onSelect={props.onSelect}
    ></AppSelect>
  );
}
