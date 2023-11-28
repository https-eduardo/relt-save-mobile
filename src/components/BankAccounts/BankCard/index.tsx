import { Text, View, TouchableOpacity } from "react-native";
import { AlertType, Card } from "../../../shared/interfaces";
import { styles } from "./styles";
import AppBadge from "../../AppBadge";
import { COLORS } from "../../../theme";
import { useMemo, useState, useContext } from "react";
import AppDialog from "../../AppDialog";
import AppButton from "../../AppButton";
import { ErrorUtils } from "../../../utils/error";
import AlertContext from "../../../contexts/alert";
import { CANNOT_DELETE_CARD } from "../../../constants";
import { CardsService } from "../../../services/cards";

interface BankCardProps {
  card: Card;
}

export default function BankCard({ card }: BankCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const alert = useContext(AlertContext);

  const cardType = useMemo(() => {
    switch (card.type) {
      case "CREDIT":
        return "Crédito";
      case "DEBIT":
        return "Débito";
    }
  }, [card.type]);

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  async function deleteCard() {
    try {
      await CardsService.delete(card.id);
    } catch (error) {
      const msg = ErrorUtils.getErrorMessage(error);

      alert.update({
        text: msg ?? CANNOT_DELETE_CARD,
        type: AlertType.ERROR,
      });
    }
    setDialogOpen(false);
  }

  const DeleteCardDialog = () => {
    return (
      <AppDialog
        title="Deletar cartão cadastrado?"
        onDismiss={toggleDialog}
        visible={dialogOpen}
      >
        <AppButton
          style={styles.deleteButton}
          textStyle={styles.deleteButtonText}
          text="Cancelar"
          onPress={toggleDialog}
        />
        <AppButton
          style={styles.deleteButton}
          textStyle={styles.deleteButtonText}
          text="Confirmar"
          primary
          onPress={deleteCard}
        />
      </AppDialog>
    );
  };

  return (
    <TouchableOpacity style={styles.bankCard} onPress={toggleDialog}>
      <DeleteCardDialog />
      <View style={styles.cardNameContainer}>
        <Text style={styles.bankCardName}>{card.name}</Text>
        <AppBadge text={cardType} color={COLORS.primary} />
      </View>
      <View style={styles.cardNumberContainer}>
        <Text style={styles.cardNumberText}>Números finais</Text>
        <Text style={styles.cardNumber}>{card.final_numbers}</Text>
      </View>
    </TouchableOpacity>
  );
}
