# Azure Provider source and version being used
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
}

# Main resource group
resource "azurerm_resource_group" "rg_main" {
  name     = var.resource_group
  location = var.location
  tags = {
    environment = "GYS"
  }
}

resource "azurerm_container_registry" "acr" {
  name                     = "gysACR"
  resource_group_name      = azurerm_resource_group.rg_main.name
  location                 = azurerm_resource_group.rg_main.location
  sku                      = "Standard"
  tags = {
    environment = "GYS"
  }
}





