import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ArticlesModule } from './modules/articles/articles.module';

@Module({
  imports: [WorkspacesModule, CategoriesModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
