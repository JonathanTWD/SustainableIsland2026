import { useCallback, useMemo, useState } from "react";
import { authService } from "../../../services/auth.service";
import { waterCalculationService } from "../../../services/water-calculation.service";
import { initialCalculatorFormState } from "../model/defaults";
import {
    calculateDailyConsumption,
    calculateDailyConsumptionBreakdown,
} from "../model/calculateDailyConsumption";
import {
    fromApiToForm,
    toCreateWaterCalculationDTO,
    toUpdateWaterCalculationDTO,
} from "../model/mappers";
import type { CalculatorFormState } from "../model/types";

export const useWaterCalculation = () => {
    const [form, setForm] = useState<CalculatorFormState>(initialCalculatorFormState);
    const [userId, setUserId] = useState<number | null>(null);
    const [recordId, setRecordId] = useState<number | null>(null);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const breakdown = useMemo(() => calculateDailyConsumptionBreakdown(form), [form]);
    const totalLitersPerDay = breakdown.totalLitersPerDay;
    const directLitersPerDay = breakdown.directLitersPerDay;
    const indirectLitersPerDay = breakdown.indirectLitersPerDay;

    const setField = useCallback(
        <K extends keyof CalculatorFormState>(key: K, value: CalculatorFormState[K]) => {
            setForm((prev) => ({ ...prev, [key]: value }));
        },
        [],
    );

    const loadInitial = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const me = await authService.getCurrentUser();
            const currentUserId = me.user.id;
            setUserId(currentUserId);

            const records = await waterCalculationService.getByUserId(currentUserId);

            if (records.length > 0) {
                const latest = records[0]; // backend sender desc by created_at
                setRecordId(latest.id);
                setForm(fromApiToForm(latest));
            } else {
                setRecordId(null);
                setForm(initialCalculatorFormState);
            }
        } catch (err) {
            console.error("Failed to load water calculation", err);
            setError("Could not load your water data");
        } finally {
            setLoading(false);
        }
    }, []);

    const save = useCallback(async (): Promise<boolean> => {
        if (!userId) {
            setError("User is not loaded yet");
            return false;
        }

        setSaving(true);
        setError(null);

        try {
            const estimated = calculateDailyConsumption(form);

            if (recordId) {
                const dto = toUpdateWaterCalculationDTO(form, estimated);
                await waterCalculationService.update(recordId, dto);
            } else {
                const dto = toCreateWaterCalculationDTO(form, userId, estimated);
                const created = await waterCalculationService.create(dto);
                setRecordId(created.id);
            }

            return true;
        } catch (err) {
            console.error("Failed to save water calculation", err);
            setError("Could not save your water data");
            return false;
        } finally {
            setSaving(false);
        }
    }, [form, recordId, userId]);

    return {
        form,
        setField,
        totalLitersPerDay,
        directLitersPerDay,
        indirectLitersPerDay,
        loading,
        saving,
        error,
        loadInitial,
        save,
    };
};