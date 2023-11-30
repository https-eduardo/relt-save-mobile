import { FlatList, Modal, Pressable, Text, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { styles } from "./styles";
import { CategoriesService } from "../../../services/categories";
import { Category } from "../../../shared/interfaces";
import AppBadge from "../../AppBadge";
import AppTextInput from "../../AppTextInput";
import { AppColorPicker } from "../../AppColorPicker";
import { COLORS } from "../../../theme";
import AppButton from "../../AppButton";
import { CategoryBadge } from "./CategoryBadge";
import AppDialog from "../../AppDialog";

interface CategoriesModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function CategoriesModal(props: CategoriesModalProps) {
  const [categoryColor, setCategoryColor] = useState(COLORS.primary);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(0);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await CategoriesService.getAll();
      setCategories(data);
    } catch {
      props.onDismiss();
    }
  }, []);

  function handleChangeNameInput(text: string) {
    setName(text);
  }

  const createCategory = useCallback(async () => {
    try {
      await CategoriesService.create({
        name,
        color: categoryColor,
      });
    } catch {}
    props.onDismiss();
  }, [name, categoryColor]);

  const deleteCategory = useCallback(async () => {
    try {
      await CategoriesService.delete(deleteCategoryId);
    } catch {}
    props.onDismiss();
  }, [deleteCategoryId]);

  function toggleDeleteDialog() {
    setDeleteDialogOpen(!deleteDialogOpen);
  }

  function handleDeleteRequest(categoryId: number) {
    toggleDeleteDialog();
    setDeleteCategoryId(categoryId);
  }

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories, props.visible]);

  return (
    <Modal visible={props.visible} transparent animationType="none">
      <AppDialog
        title="Deletar categoria?"
        onDismiss={toggleDeleteDialog}
        visible={deleteDialogOpen}
      >
        <AppButton
          style={styles.editButton}
          textStyle={styles.editButtonText}
          onPress={toggleDeleteDialog}
          text="Cancelar"
        />
        <AppButton
          style={styles.editButton}
          textStyle={styles.editButtonText}
          onPress={deleteCategory}
          text="Confirmar"
          primary
        />
      </AppDialog>
      <Pressable style={styles.overlay} onPress={props.onDismiss} />
      <View style={styles.content}>
        <Text style={styles.title}>Categorias</Text>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategoryBadge
              onRequestDelete={() => handleDeleteRequest(item.id)}
              color={item.color}
              name={item.name}
              key={item.id}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.newCategoryContainer}>
          <Text style={styles.newCategoryTitle}>Nova categoria</Text>
          <View style={styles.newCategoryForm}>
            <AppTextInput
              block
              onChangeText={handleChangeNameInput}
              label="Nome"
              placeholder="Mercado"
            />
            <AppColorPicker value={categoryColor} />
          </View>
          <AppButton primary onPress={createCategory} text="Adicionar" />
        </View>
      </View>
    </Modal>
  );
}
