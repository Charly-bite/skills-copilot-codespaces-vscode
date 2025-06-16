function SkillMember(name, skill) {
  this.name = name;
  this.skill = skill;

  this.getName = function() {
    return this.name;
  };

  this.getSkill = function() {
    return this.skill;
  };

  this.setSkill = function(newSkill) {
    this.skill = newSkill;
  };
}

  