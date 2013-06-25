package com.kendoui.spring.models;

public class ProteinScoreItem {
    private String name;
    private String abbr;
    private int score;
    
    public ProteinScoreItem(String name, String abbr, int score) {
        setName(name);
        setAbbr(abbr);
        setScore(score);
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public String getAbbr() {
        return abbr;
    }

    public void setAbbr(String abbr) {
        this.abbr = abbr;
    }
    
    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
