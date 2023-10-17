package capstone.manager.models;

import java.util.Objects;

public class Sheet {

    private int id;
    private String playerName;
    private String characterName;
    private int curHitPoints;
    private int maxHitPoints;
    private int armorClass;
    private int savingThrow;
    private int thac0;
    private int attackBonus;

    public Sheet() {
    }

    public Sheet(int id, String playerName, String characterName, int curHitPoints, int maxHitPoints, int armorClass, int savingThrow, int thac0, int attackBonus) {
        this.id = id;
        this.playerName = playerName;
        this.characterName = characterName;
        this.curHitPoints = curHitPoints;
        this.maxHitPoints = maxHitPoints;
        this.armorClass = armorClass;
        this.savingThrow = savingThrow;
        this.thac0 = thac0;
        this.attackBonus = attackBonus;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getCharacterName() {
        return characterName;
    }

    public void setCharacterName(String characterName) {
        this.characterName = characterName;
    }

    public int getCurHitPoints() {
        return curHitPoints;
    }

    public void setCurHitPoints(int curHitPoints) {
        this.curHitPoints = curHitPoints;
    }

    public int getMaxHitPoints() {
        return maxHitPoints;
    }

    public void setMaxHitPoints(int maxHitPoints) {
        this.maxHitPoints = maxHitPoints;
    }

    public int getArmorClass() {
        return armorClass;
    }

    public void setArmorClass(int armorClass) {
        this.armorClass = armorClass;
    }

    public int getSavingThrow() {
        return savingThrow;
    }

    public void setSavingThrow(int savingThrow) {
        this.savingThrow = savingThrow;
    }

    public int getThac0() {
        return thac0;
    }

    public void setThac0(int thac0) {
        this.thac0 = thac0;
    }

    public int getAttackBonus() {
        return attackBonus;
    }

    public void setAttackBonus(int attackBonus) {
        this.attackBonus = attackBonus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sheet sheet = (Sheet) o;
        return id == sheet.id && curHitPoints == sheet.curHitPoints && maxHitPoints == sheet.maxHitPoints && armorClass == sheet.armorClass && savingThrow == sheet.savingThrow && thac0 == sheet.thac0 && attackBonus == sheet.attackBonus && Objects.equals(playerName, sheet.playerName) && Objects.equals(characterName, sheet.characterName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, playerName, characterName, curHitPoints, maxHitPoints, armorClass, savingThrow, thac0, attackBonus);
    }
}
