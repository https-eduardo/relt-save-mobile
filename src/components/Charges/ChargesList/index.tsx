import { FlatList, ListRenderItemInfo, Text } from "react-native";
import { Charge } from "../../../shared/interfaces";
import ChargeCard from "../../Charges/ChargeCard";

interface ChargesListProps {
  charges: Charge[];
}

export default function ChargesList({ charges }: ChargesListProps) {
  function renderChargeCard({ item }: ListRenderItemInfo<Charge>) {
    return <ChargeCard charge={item} />;
  }

  return (
    <FlatList
      data={charges}
      renderItem={renderChargeCard}
      keyExtractor={(charge) => charge.id.toString()}
    />
  );
}
