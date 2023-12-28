import { Text, TouchableOpacity, View } from "react-native";
import { AlertType, Charge } from "../../../shared/interfaces";
import { styles } from "./styles";
import { NumberUtils } from "../../../utils/number";
import { numberStyles } from "../../../shared/styles/numbers.styles";
import { useContext, useMemo, useState } from "react";
import { DateUtils } from "../../../utils/date";
import AppDialog from "../../AppDialog";
import AppButton from "../../AppButton";
import { ChargesService } from "../../../services/charges";
import { ErrorUtils } from "../../../utils/error";
import AlertContext from "../../../contexts/alert";
import { CANNOT_MARK_CHARGE_AS_PAID } from "../../../constants";

interface ChargeCardProps {
  charge: Charge;
}

export default function ChargeCard({ charge }: ChargeCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const alert = useContext(AlertContext);

  const value = useMemo(() => {
    return NumberUtils.formatValue(charge.value);
  }, []);

  const chargePaid = useMemo(() => {
    if (!charge.paid_at) return false;

    return true;
  }, [charge.paid_at, charge.due_date]);

  const date = useMemo(() => {
    return DateUtils.formatDate(
      new Date(chargePaid ? charge.paid_at : charge.due_date)
    );
  }, [charge.paid_at, charge.due_date]);

  const valueStyle = useMemo(() => {
    return charge.value < 0 ? numberStyles.expense : numberStyles.income;
  }, [charge.value]);

  function toggleDialog() {
    setDialogOpen(!dialogOpen);
  }

  async function markAsPaid() {
    try {
      await ChargesService.markAsPaid(charge.id, !chargePaid);
    } catch (error) {
      const msg = ErrorUtils.getErrorMessage(error);

      alert.update({
        text: msg ?? CANNOT_MARK_CHARGE_AS_PAID,
        type: AlertType.ERROR,
      });
    }
    setDialogOpen(false);
  }

  const ChargeEditDialog = () => {
    const title = useMemo(() => {
      if (!chargePaid) return "Marcar cobrança como paga?";
      return "Marcar cobrança como pendente?";
    }, [chargePaid]);

    return (
      <AppDialog title={title} visible={dialogOpen} onDismiss={toggleDialog}>
        <AppButton
          style={styles.editButton}
          textStyle={styles.editButtonText}
          onPress={toggleDialog}
          text="Cancelar"
        />
        <AppButton
          style={styles.editButton}
          textStyle={styles.editButtonText}
          onPress={markAsPaid}
          text="Confirmar"
          primary
        />
      </AppDialog>
    );
  };

  return (
    <TouchableOpacity style={styles.chargeCard} onPress={toggleDialog}>
      <ChargeEditDialog />
      <View style={styles.mainRow}>
        <Text style={styles.chargeTitle}>Pagamento</Text>
        <Text style={styles.chargeDate}>
          {chargePaid ? "Pago em:" : "Vence em:"} {date}
        </Text>
      </View>
      <View>
        <Text style={[numberStyles.valueText, valueStyle]}>R$ {value}</Text>
      </View>
    </TouchableOpacity>
  );
}
