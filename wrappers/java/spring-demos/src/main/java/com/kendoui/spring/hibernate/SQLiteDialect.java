package com.kendoui.spring.hibernate;

import org.hibernate.dialect.Dialect;
import org.hibernate.dialect.function.SQLFunctionTemplate;
import org.hibernate.dialect.function.StandardSQLFunction;
import org.hibernate.dialect.function.VarArgsSQLFunction;
import org.hibernate.type.StandardBasicTypes;

import java.sql.Types;

// Using the implementation from http://code.google.com/p/hibernate-sqlite/

public class SQLiteDialect extends Dialect {
    public SQLiteDialect() {
        super();
        registerColumnType(Types.BIT, "integer");
        registerColumnType(Types.TINYINT, "tinyint");
        registerColumnType(Types.SMALLINT, "smallint");
        registerColumnType(Types.INTEGER, "integer");
        registerColumnType(Types.BIGINT, "bigint");
        registerColumnType(Types.FLOAT, "float");
        registerColumnType(Types.REAL, "real");
        registerColumnType(Types.DOUBLE, "double");
        registerColumnType(Types.NUMERIC, "numeric");
        registerColumnType(Types.DECIMAL, "decimal");
        registerColumnType(Types.CHAR, "char");
        registerColumnType(Types.VARCHAR, "varchar");
        registerColumnType(Types.LONGVARCHAR, "longvarchar");
        registerColumnType(Types.DATE, "date");
        registerColumnType(Types.TIME, "time");
        registerColumnType(Types.TIMESTAMP, "datetime");
        registerColumnType(Types.BINARY, "blob");
        registerColumnType(Types.VARBINARY, "blob");
        registerColumnType(Types.LONGVARBINARY, "blob");
        // registerColumnType(Types.NULL, "null");
        registerColumnType(Types.BLOB, "blob");
        registerColumnType(Types.CLOB, "clob");
        registerColumnType(Types.BOOLEAN, "integer");

        registerFunction("concat", new VarArgsSQLFunction(StandardBasicTypes.STRING, "", "||", ""));
        registerFunction("mod", new SQLFunctionTemplate(StandardBasicTypes.INTEGER, "?1 % ?2"));
        registerFunction("substr", new StandardSQLFunction("substr", StandardBasicTypes.STRING));
        registerFunction("substring", new StandardSQLFunction("substr", StandardBasicTypes.STRING));
        registerFunction("year", new SQLFunctionTemplate(StandardBasicTypes.INTEGER, "cast(strftime('%Y', ?1 / 1000, 'unixepoch') as int)"));
        registerFunction("month", new SQLFunctionTemplate(StandardBasicTypes.INTEGER, "cast((strftime('%m', ?1 / 1000, 'unixepoch') - 1) as int)"));
        registerFunction("day", new SQLFunctionTemplate(StandardBasicTypes.INTEGER, "cast(strftime('%d', ?1 / 1000, 'unixepoch') as int)"));
        registerFunction("hour", new SQLFunctionTemplate(StandardBasicTypes.INTEGER, "cast(strftime('%H', ?1 / 1000, 'unixepoch') as int)"));
        registerFunction("minute", new SQLFunctionTemplate(StandardBasicTypes.INTEGER, "cast(strftime('%M', ?1 / 1000, 'unixepoch') as int)"));
    }

    public boolean supportsIdentityColumns() {
        return true;
    }

    /*
     public boolean supportsInsertSelectIdentity() {
     return true; // As specify in NHibernate dialect
     }
     */

    public boolean hasDataTypeInIdentityColumn() {
        return false; // As specify in NHibernate dialect
    }

    /*
     public String appendIdentitySelectToInsert(String insertString) {
     return new StringBuffer(insertString.length()+30). // As specify in NHibernate dialect
     append(insertString).
     append("; ").append(getIdentitySelectString()).
     toString();
     }
     */

    public String getIdentityColumnString() {
        // return "integer primary key autoincrement";
        return "integer";
    }

    public String getIdentitySelectString() {
        return "select last_insert_rowid()";
    }

    public boolean supportsLimit() {
        return true;
    }

    public String getLimitString(String query, boolean hasOffset) {
        return new StringBuffer(query.length() + 20).append(query).append(
                hasOffset ? " limit ? offset ?" : " limit ?").toString();
    }

    public boolean supportsTemporaryTables() {
        return true;
    }

    public String getCreateTemporaryTableString() {
        return "create temporary table if not exists";
    }

    public boolean dropTemporaryTableAfterUse() {
        return false;
    }

    public boolean supportsCurrentTimestampSelection() {
        return true;
    }

    public boolean isCurrentTimestampSelectStringCallable() {
        return false;
    }

    public String getCurrentTimestampSelectString() {
        return "select current_timestamp";
    }

    public boolean supportsUnionAll() {
        return true;
    }

    public boolean hasAlterTable() {
        return false; // As specify in NHibernate dialect
    }

    public boolean dropConstraints() {
        return false;
    }

    public String getAddColumnString() {
        return "add column";
    }

    public String getForUpdateString() {
        return "";
    }

    public boolean supportsOuterJoinForUpdate() {
        return false;
    }

    public String getDropForeignKeyString() {
        throw new UnsupportedOperationException(
                "No drop foreign key syntax supported by SQLiteDialect");
    }

    public String getAddForeignKeyConstraintString(String constraintName,
            String[] foreignKey, String referencedTable, String[] primaryKey,
            boolean referencesPrimaryKey) {
        throw new UnsupportedOperationException(
                "No add foreign key syntax supported by SQLiteDialect");
    }

    public String getAddPrimaryKeyConstraintString(String constraintName) {
        throw new UnsupportedOperationException(
                "No add primary key syntax supported by SQLiteDialect");
    }

    public boolean supportsIfExistsBeforeTableName() {
        return true;
    }

    public boolean supportsCascadeDelete() {
        return false;
    }
    
    public boolean bindLimitParametersInReverseOrder() {
        return true;
    }
}
